const mongoose=require("mongoose");


const answerSchema=new mongoose.Schema({
    questionIndex:Number,
    value:mongoose.Schema.Types.Mixed
})

const responseSchema=new mongoose.Schema(
    {
        surveyId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Survey",
            required:true
        },
        answers:[answerSchema],
        submittedBy:{
            type:String
        }
    },{timestamps:true}
    
    );

    module.exports=mongoose.model("Response",responseSchema);