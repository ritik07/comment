import React, { useState } from 'react';
import CustomInput from '../../_controls/CustomInput';
import { Button } from 'antd';
import moment from 'moment';
import { uuidv4 } from '../../_factoryfunction/uuid';
import { notify } from '../../_factoryfunction/notifications';
import { CommentOutlined, CloseOutlined } from '@ant-design/icons';

const CommentComponent = ({ UID, handleListingData, userName, handleReply }) => {

  const [name, setName] = useState(undefined);
  const [commentText, setCommentText] = useState(undefined);

  const handleName = (value) => {
    setName(value)
  }

  const handleComment = (value) => {
    setCommentText(value)
  }

  const resetFields = () => {
    setName(undefined)
    setCommentText(undefined)
  }

  const handleOnPost = () => {
    let nameValidation = name?.trim()
    let commentValidation = commentText?.trim()
    if (!nameValidation || !commentValidation) {
      if (!nameValidation) {
        notify("err", "Name field cannot be empty!")
        return
      }
      if (!commentValidation) {
        notify("err", "Comment field cannot be empty!")
        return
      }
    }
    let payload
    if (UID) {
      let tempData = JSON.parse(localStorage.getItem('commentData'))
      let indexOfReply = tempData.indexOf(tempData.find((e) => e.UID === UID));
      tempData[indexOfReply].reply.push({
        name: name,
        comment: commentText,
        timeStamp: moment().format("DD-MM-YYYY"),
        UID: uuidv4()
      })
      let tempPayload = JSON.parse(localStorage.getItem('commentData'))[indexOfReply] = tempData
      handleListingData([tempPayload], true)
      resetFields()
      handleReply(false)
    } else {
      payload = {
        name: name,
        comment: commentText,
        timeStamp: moment().format("DD-MM-YYYY"),
        UID: uuidv4(),
        reply: []
      }
      handleListingData(payload)
      resetFields()
    }
  }

  return <div>
    <div className="cs-comment-card cs-p-10">
      <div className="cs-bp-5 cs-fw-600 cs-pos-relative">
        {UID ? <div>Reply to {userName} <CommentOutlined /></div> : "Comment"}

        {UID ? <div className="cs-close-reply cs-pointer">
          <CloseOutlined onClick={() => handleReply(false)} />
        </div> : null}
      </div>
      <div className="cs-bp-8">
        <CustomInput placeholder="Name" setOnChange={handleName} inputValue={name} />
      </div>
      <div className="cs-bp-8">
        <CustomInput placeholder="Comment" setOnChange={handleComment} isTextArea={true} inputValue={commentText} />
      </div>
      <div style={{ display: "block" }}>
        <div className="cs-float-right cs-w-100">
          <Button type="primary" onClick={handleOnPost} >Post</Button>
        </div>
      </div>
    </div>
  </div>
};

export default CommentComponent;
