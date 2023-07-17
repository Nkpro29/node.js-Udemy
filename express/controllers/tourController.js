const Tour = require('./../models/tourModel');

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

exports.getAllTours = async (req, res) => {
  try{
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params);

  // const id = req.params.id * 1; // it is a small trick to convert string into number in js.
  // const tour = tours.find((el) => el.id === id);
try{
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  });
}
};

exports.updateTour = async (req, res) => {
  try{
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators:true
    });
    res.status(200).json({
      status: 'success',
      data:{
        updatedTour,
      }
    });
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    });
  }
  
};

exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
      message:['The deleted tour is: ',deletedTour]
    });
  } catch (error) {
    res.status(404).json({
      status:'fail',
      message:err
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
  } catch (err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }
};
