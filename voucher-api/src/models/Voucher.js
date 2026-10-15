
import mongoose from 'mongoose'

const voucherSchema = new mongoose.Schema(
    {
        kode_voucher: {
            type: String,
            required: [true, 'Kode voucher wajib diisi'],
            trim: true,
            unique: true,
            minlength: [1, 'Kode voucher tidak boleh kosong'],
        },

        persentase_diskon: {
            type: Number,
            required: [true, 'Persentase diskon wajib diisi'],
            min: [0, 'Persentase diskon minimal 0'],
            max: [100, 'Persentase diskon maksimal 100'],
        },

        masih_aktif: {
            type: Boolean,
            default: false,
        },
    },
    {versionKey: false}
)

const Voucher = mongoose.model('Voucher', voucherSchema, 'vouchers')

export default Voucher
