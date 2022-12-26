
const express = require('express')
const router = express.Router()

const services = require('../services/render');
const { protect } = require('../middleware/authMiddleware')

const {
  getflags,
  getflagsPublic,
  setflag,
  updateflag,
  deleteflag
} = require('../controller/flagsController')

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/flags/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })


// @description Root Route
// @method GET/

router.get('/test', services.homeRoutes)

// @description add user Route
// @method GET/

router.get('/add_user', services.add_user)

// Blog API
// route.post('/add',blogController.create)
// route.get('/',blogController.find)
// route.put('/:id',blogController.update)
// route.delete('/:id',blogController.delete)




router.route('/').get(protect, getflags).post(upload.array('image'),protect, setflag)
router.route('/:id').get(protect, getflags)
router.route('/:id').delete(protect, deleteflag).put(protect, updateflag)
router.route('/public/all').get(getflagsPublic)
  module.exports= router