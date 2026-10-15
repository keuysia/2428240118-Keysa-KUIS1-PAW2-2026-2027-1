
import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import VoucherController from '../controllers/voucher.controller.js'

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

// Voucher CRUD
router.post('/vouchers', (req, res) => VoucherController.store(req, res))
router.get('/vouchers', (req, res) => VoucherController.index(req, res))
router.get('/vouchers/:id', (req, res) => VoucherController.show(req, res))
router.put('/vouchers/:id', (req, res) => VoucherController.update(req, res))
router.delete('/vouchers/:id', (req, res) => VoucherController.destroy(req, res))

export default router
