import React, { useState, useEffect } from 'react';
import CommentComponent from '../../component/comment/CommentComponent';
import UserComment from '../../component/comment/UserComment';
import { Row, Col } from 'antd';

const Comment = () => {

  const [listingData, setListingData] = useState([]);


  const updateListingData = (value) => {
    setListingData(value)
    localStorage.setItem('commentData', JSON.stringify(value))
  }

  useEffect(() => {
    if (!listingData.length
      && JSON.parse(localStorage.getItem('commentData'))
      && JSON.parse(localStorage.getItem('commentData')).length) {
      setListingData(JSON.parse(localStorage.getItem('commentData')))
    }
  }, [listingData])

  const handleListingData = (value, reply) => {
    let tempData;
    if (reply) {
      setListingData(...value)
      localStorage.setItem('commentData', JSON.stringify(...value))
    } else {
      tempData = [...listingData, value]
      setListingData(tempData)
      localStorage.setItem('commentData', JSON.stringify(tempData))
    }
  }

  const handleDelete = (id) => {
    let tempData = JSON.parse(localStorage.getItem('commentData'))
    let indexOfItem = tempData.indexOf(tempData.find((e) => e.UID === id));
    tempData.splice(indexOfItem, 1)
    setListingData(tempData)
    localStorage.setItem('commentData', JSON.stringify(tempData))
  }

  const handleOnReplyDelete = (parentId, replyId) => {
    let tempData = JSON.parse(localStorage.getItem('commentData'))
    let indexOfItem = tempData.indexOf(tempData.find((e) => e.UID === parentId));

    let replyData = tempData[indexOfItem].reply
    let indexOfReply = replyData.indexOf(replyData.find((e) => e.UID === replyId))
    replyData.splice(indexOfReply, 1)

    let temp = listingData;
    temp[indexOfItem].reply.splice(indexOfReply, 1)
    setListingData(...temp)
    localStorage.setItem('commentData', JSON.stringify(temp))
  }

  return <div>
    <div className="cs-container">
      <Row className="cs-bp-10">
        <Col span={24}>
          <CommentComponent handleListingData={handleListingData} />
        </Col>
      </Row>
      <Row className="cs-float-right">
        <Col span={24}>
          <UserComment data={listingData} handleListingData={handleListingData}
            handleDelete={handleDelete} handleOnReplyDelete={handleOnReplyDelete}
            updateListingData={updateListingData} />
        </Col>
      </Row>
    </div>
  </div>
};

export default Comment;
