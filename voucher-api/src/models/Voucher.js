
import mongoose from 'mongoose'

const voucherSchema = new mongoose.Schema(
  {
    kode_voucher: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    persentase_diskon: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    masih_aktif: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: 'voucher',
    versionKey: false,
  },
)

const Voucher = mongoose.model('Voucher', voucherSchema)

export default Voucher
