import _ from 'lodash';
import { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';

const Question=(props)=>{
    const{data,index}=props;
    if(_isEmpty(data)){
        return(<>
            </>)
    }
    const [isPreviewImage,setIsPreviewImage] =useState(false);
    
    const handleCheckBox=(event,aId,qId)=>{
        props.handleCheckBox(aId,qId);
    }
    return(
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} 
                        onClick={()=>setIsPreviewImage(true)}
                        style={{cursor:'pointer'}}/>
                    {
                    isPreviewImage===true &&
                    <Lightbox image={`data:image/jpeg;base64,${data.image}`}
                    title= 'question image'
                    onClose={()=>setIsPreviewImage(false)}></Lightbox>
                    }
                </div>
                :
                <div  className='q-image'>

                </div>
            }

            <div className="question">Question {index+1} : {data.questionDescription}</div>
            <div className="answer">
                {data.answers && data.answers.length && data.answers.map((a,i)=>{
                    return (
                        <div key={`answer-${i}`} className="a-child">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                    onChange={(event)=>handleCheckBox(event,a.id,data.questionId )}
                                    checked={a.isSelected}/>
                                <label className="form-check-label" for="flexCheckDefault">
                                    {a.description}
                                </label>
                            </div>
                        </div>
                    )
                })
                } 
            </div>
        </>
    )
}
export default Question;