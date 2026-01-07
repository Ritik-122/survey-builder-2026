const mongoose=require("mongoose");

const questionSchema=new mongoose.Schema({

    type:{
        type:String,
        enum:["text","mcq","rating"],
        required:true
    },
    label:{type:String,required:true},
    options:[String],
    required:{type:Boolean,default:false}

});

const surveySchema=new mongoose.Schema({
    title:{type:String, required:true},
    questions:[questionSchema],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    published:{type:Boolean,default:false}

},{timestamps:true})

module.exports=mongoose.model("Survey",surveySchema);