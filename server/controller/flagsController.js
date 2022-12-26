const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb');

var Flag = require('../model/flagModel')
var Admin = require('../model/adminModel')

// @desc    Get flags
// @route   GET /api/flags
// @access  Private
const getflags = asyncHandler(async (req, res) => {
  // const flags = await Blog.find({ user: req.user.id })

  if(req.params.id){
    // await Blog.findById(req.params.id)
   

    await Flag.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "admin_cols",
          as:"admin",
          localField:"user",
          foreignField:"_id"
        },
      },
    ])


    .then(flags => {
      // res.send(user)
      res.status(200).json(flags)

    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error Occured while retrieving flags information" })
    })
  }
  else{
    await Flag.aggregate([
      {
        $lookup:{
          from: "admin_cols",
          as:"admin",
          localField:"user",
          foreignField:"_id"
        
        }
      }
      
        ])

        .then(flags => {
          // res.send(user)
          res.status(200).json(flags)
    
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Error Occured while retrieving flags information" })
        })
  }
  

  // .find()

   


})

// @desc    Get flags
// @route   GET /api/flags
// @access  Private
const getflagsPublic = asyncHandler(async (req, res) => {
  // res.send({ message: "Content cannot be empty!!" });return;
  const flags = await Flag.find()

  res.status(200).json(flags)
})


// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setflag = asyncHandler(async (req, res) => {

  // console.log(req.files);return;
  
  const user = req.user.id;
  const image = req.files

  // @validate request
  if ( !image ) {
    res.status(400)
      // res.send(data)
      .send({ message: "Content cannot be empty!!" })
    // throw new Error('Please add all fields')
  }


  const flag = await Flag.create({
    user,
    
    image,
    
  })

  res.status(200).json(flag)

  // .then(data=>{
  //     res.send(data)
  // })
  // .catch(err=>{
  //     res.status(500).send({
  //         message:err.message || "Some error occured while creating a blog operation"
  //     })
  // })
})

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateflag = asyncHandler(async (req, res) => {
  const flags = await Flag.findById(req.params.id)

  if (!flags) {
    res.status(400)
    throw new Error('Blog not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the blog user
  if (blog.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedBlog = await Flag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedBlog)
})


// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteflag = asyncHandler(async (req, res) => {
  const blog = await Flag.findById(req.params.id)

  if (!blog) {
    res.status(400)
    throw new Error('Blog not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (blog.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await blog.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getflags,
  getflagsPublic,
  setflag,
  updateflag,
  deleteflag
}