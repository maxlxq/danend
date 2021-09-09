
let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  LEAN = 'lean',
  DanSchema = function (props) {
    let baseSchema,
      injectLeanOption
    props.dId = {type: String, default: ''}
    props.CreatedBy = {type: String}
    props.CreatedDate = {type: Number, default: Date.now}
    props.ModifiedBy = {type: String}
    props.ModifiedDate = {type: Number, default: Date.now}
    baseSchema = new Schema(props, {
      _id: true,
      autoIndex: false
    })
    injectLeanOption = function (mongooseObject) {
      const mLeanOptions = Object.keys(mongooseObject._mongooseOptions).some(function (item) {
        return item === LEAN && !mongooseObject._mongooseOptions[LEAN]
      })
      if (!mLeanOptions) {
        mongooseObject._mongooseOptions.lean = true
      }
    }
    baseSchema.index({dId: 1}, {unique: false})
    baseSchema.set('toJSON', {
      virtuals: true
    })
    baseSchema.pre('save', function (next) {
      const self = this
      self.validate(function (error) {
        let now = Date.now()
        if (error) {
          next(error)
        } else {
          if (self.isNew) {
            self._doc._id = new mongoose.Types.ObjectId()
            self._doc.CreatedDate = self._doc.CreatedDate || now
            self._doc.ModifiedDate = self._doc.ModifiedDate || now
            self._doc.ModifiedBy = self._doc.ModifiedBy || self._doc.CreatedBy
          } else if (self.ModifiedDate) {
            self.ModifiedDate = now
          }
          next()
        }
      })
    })
    baseSchema.pre('findOneAndUpdate', function (next) {
      this.options.runValidators = true
      this.updateOne({}, {
        $set: {
          ModifiedDate: Date.now()
        }
      })
      next()
    })
    baseSchema.pre('update', function (next) {
      this.options.runValidators = true
      this.updateMany({}, {
        $set: {
          ModifiedDate: Date.now()
        }
      })
      next()
    })
    baseSchema.post('update', function (data) {
      data.result = data.n || data.result.n
    })
    baseSchema.pre('findOne', function () {
      injectLeanOption(this)
    })
    baseSchema.pre('find', function () {
      injectLeanOption(this)
    })
    return baseSchema
  }
module.exports = DanSchema
