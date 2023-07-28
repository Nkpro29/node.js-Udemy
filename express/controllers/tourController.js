const { query } = require('express');
const Tour = require('./../models/tourModel');
// const APIfeatures = require('./../utils/apiFeatures');
// exports.checkBody = (req, res, next)=>{
//     if(!req.body.name || !req.body.price){
//         return res.status(404).json({
//             status:"failure",
//             message:"name and price are not defined."
//         });
//     }

//     next();
// }

// exports.checkID = (req, res, next, val) => {
//   console.log(`tour id : ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'failure',
//       message: 'invalid id',
//     });
//   }

//   next();
// };

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating,price';
  req.query.fields = 'name,price,rating,difficulty,summary';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    // 1A)filtering
    const queryObject = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    // 1B)advanced filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //limit =10, page=3, 1-10->page1, 10-20-> page2 , 20-30-> page3
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error('This page does not exist');
      }
    }

    //execute query

    // 1) refactored API
    // const features =  new APIfeatures(Tour.find(),req.query).filter().sort().limitFields().paginate();
    // console.log(features.query);
    // const tours = await features.query;

    // 2) Normal API
    const tours = await query;

    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getToursStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { rating: { $gte: 4.0 } },
      },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ])
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        stats,
      },
    }); 
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params);

  // const id = req.params.id * 1; // it is a small trick to convert string into number in js.
  // const tour = tours.find((el) => el.id === id);
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
      message: ['The deleted tour is: ', deletedTour],
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // console.log(req.body);

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tours: newTour,
  //       },
  //     });
  //   }
  // );

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.getMonthlyPlan = async(req,res)=>{
  try{
    const year = req.params.year*1; //2021
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates'
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-05-01`),
            }
          }
        },
        {
          $group: {
            _id: {$month: '$startDates'},
            numberTourStarts: { $sum : 1},
            tours: {$push : '$name'}
          }
        },
        {
          $addFields: { month: '$_id'},
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: { numberTourStarts: -1}
        },
        {
          $limit: 1 
        }
      ])
      res.status(201).json({
        status: 'success',
        number_of_Tours: plan.length,
        data: {
          plan,
        },
      });
  }catch(err){
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

}