const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//creation of GeoSchema

const GeoSchema = new Schema({
    type:{
        type:String,
        default:'Point'
    },
    coordinates:{
        type:[Number],
        index:'2dsphere'
    }
});

//creation of schema and definiton of model

const LoadSchema = new Schema({
    name:{  
        type:String,
        required:[true, 'name field required']
        },
    load:{
        type:String,
    },
    available:{
        type: Boolean,
        default:false
    },
    geometry: GeoSchema
    
});

const Load =mongoose.model('load', LoadSchema);
module.exports = Load;