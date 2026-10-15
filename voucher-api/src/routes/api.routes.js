
import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
} from '../controllers/voucher.controller.js'

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

// Voucher CRUD
router.post('/vouchers', createVoucher)
router.get('/vouchers', getAllVouchers)
router.get('/vouchers/:id', getVoucherById)
router.put('/vouchers/:id', updateVoucher)
router.delete('/vouchers/:id', deleteVoucher)

export default router
