import { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
const DetailQuiz=()=>{
    const params=useParams();
    const location=useLocation();
    const quizId=params.id;
    const [dataQuiz,setDataQuiz]=useState([]);
    const [index,setIndex]=useState(0);
    const [isShowModalResult,setIsShowModalResult]=useState(false);
    const [dataModalResult,setDataModalResult]=useState({});

    const handlePrev=()=>{
        if(dataQuiz && index-1 >=0)

        setIndex(index-1)
    }
    const handleNext=()=>{
        if(dataQuiz && dataQuiz.length>index+1)
            setIndex(index+1)
    }
    const handleFinish =async()=>{
        let payload={
            quizId:+quizId,
            answers:[]
        }
        let answers=[];
        if(dataQuiz &&dataQuiz.length>0){
            dataQuiz.forEach(item=>{
                let questionId=+item.questionId;
                let userAnswerId=[];
                item.forEach(a=>{
                    if(a.isSelected===true)
                        userAnswerId.push(a.id)
                })
                answers.push({
                    questionId:+questionId,
                    userAnswerId:userAnswerId
                })
            })
            payload.answers=answers;
            let res=await postSubmitQuiz(payload);
            if(res&&res.EC===0){
                setDataModalResult({
                    countCorrect:res.DT.countCorrect,
                    countTotal:res.DT.countTotal ,
                    quizData:res.DT.quizData
                })
                setIsShowModalResult(true)
            }else{

            }
        }

    }
    const handleCheckBox=(answerId,questionId)=>{
        let dataQuizClone=_.cloneDeep(dataQuiz);
        let question=dataQuizClone.find(item=>+item.questionId===+questionId)
        if(question &&question.answers){
            question.answers= question.answers.map(item=>{
                if(+item.id===+answerId)
                    item.isSelected=!item.isSelected;
                return item;
            })
        }
        let index=dataQuizClone.findIndex(item=>+item.questionId===+questionId)
        if(index>-1){
            dataQuizClone[index]=question;
            setDataQuiz(dataQuizClone);
        }
    }
    useEffect(()=>{
        fetchQuestion();
    },[quizId])
    const fetchQuestion=async()=>{
        let res=await getDataQuiz(quizId);
        
        if(res && res.EC === 0){ 
            let raw =res.DT;
            let data = _.chain(raw)
            .groupBy("id")
            .map((value, key) => {
                let answers=[];
                let questionDescription,image=null;
                value.forEach((item,index)=>{
                    if(index===0){
                        questionDescription=item.description;
                        image=item.image;
                    }
                    item.answers.isSelected=false;
                    answers.push(item.answers);
                })
                answers=_.orderBy(answers,['id'],['asc']);
                return { questionId: key, answers ,questionDescription,image}
            })
            .value();
            setDataQuiz(data)
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                   QUIZ {quizId} : {location?.state?.quizTitle}
                </div>
                <hr/>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                   <Question index={index}  data={dataQuiz && dataQuiz.length>0 ? dataQuiz[index]:[]} 
                   handleCheckBox={handleCheckBox} />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={()=>handlePrev()}>
                        Prev
                    </button>
                    <button className="btn btn-primary " onClick={()=>handleNext()}>
                        Next
                    </button>
                    <button className="btn btn-warning " onClick={()=>handleFinish()}>
                       Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                <RightContent  dataQuiz={dataQuiz}
                handleFinish={handleFinish}
                setIndex={setIndex}/>
            </div>
            <ModalResult show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}/>
        </div>
    )
}
export default DetailQuiz