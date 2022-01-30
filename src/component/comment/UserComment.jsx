import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CommentComponent from './CommentComponent';
import { DeleteOutlined, ArrowDownOutlined } from '@ant-design/icons';
import CustomInput from '../../_controls/CustomInput';
import { notify } from '../../_factoryfunction/notifications';
import moment from 'moment';



const UserComment = ({ data, handleListingData, handleDelete, handleOnReplyDelete, updateListingData }) => {
  const [UID, setUID] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentText, setCommentText] = useState(undefined);
  const [dataSort, setDataSort] = useState('A');
  const [listingData, setListingData] = useState(false);

  const handleReply = (value, id) => {
    setIsEdit(false)
    setIsReply(value)
    setUID(id)
  }

  // setListingData(data.sort((a, b) => moment(a.timeStamp, 'DD-MM-YYYY').isBefore(moment(b.timeStamp, 'DD-MM-YYYY')) ? -1 : 1))
  useEffect(() => {
    setListingData(data)
  }, [data])

  const handleEdit = (value, id, commentValue) => {
    setIsEdit(value)
    setUID(id)
    setCommentText(commentValue)
  }

  const handleComment = (value) => {
    setCommentText(value)
  }

  const sortData = () => {
    if (dataSort === 'A') {
      setListingData(data.sort((a, b) => moment(a.timeStamp, 'DD-MM-YYYY').isBefore(moment(b.timeStamp, 'DD-MM-YYYY')) ? -1 : 1))
      setDataSort('D')
    } else {
      setListingData(data.sort((a, b) => moment(b.timeStamp, 'DD-MM-YYYY').isBefore(moment(a.timeStamp, 'DD-MM-YYYY')) ? -1 : 1))
      setDataSort('A')
    }
  }

  const updateReply = (value, id, parentId) => {
    let validation = value.trim()
    if (!validation) {
      notify("err", "Comment field cannot be empty!")
      return
    }

    if (parentId) {
      let tempData = JSON.parse(localStorage.getItem('commentData'))
      let indexOfItem = tempData.indexOf(tempData.find((e) => e.UID === parentId));
      let replyData = tempData[indexOfItem].reply
      let indexOfReply = replyData.indexOf(replyData.find((e) => e.UID === id))
      tempData[indexOfItem].reply[indexOfReply].comment = value
      setIsEdit(false)
      setCommentText(value)
      updateListingData(tempData)
    } else {
      let tempData = JSON.parse(localStorage.getItem('commentData'))
      let indexOfItem = tempData.indexOf(tempData.find((e) => e.UID === id));
      tempData[indexOfItem].comment = value
      setIsEdit(false)
      setCommentText(value)
      updateListingData(tempData)
    }
  }

  return <div>
    {listingData && listingData.length ?
      <>
        <div className="cs-float-right cs-tm-10">
          <span className="cs-pointer" onClick={sortData}>
            Sort By: Date and time<ArrowDownOutlined rotate={dataSort === 'A' ? 0 : 180} />
          </span>
        </div>
        {listingData.map((items, index) => {
          return (
            <React.Fragment key={index}>
              <div className="cs-comment-card cs-p-10 cs-tm-10 cs-pos-relative">
                <div className="cs-fw-600 cs-dis-flex cs-justify-content-sb">
                  <div>
                    {items.name}
                  </div>
                  <div>
                    {items.timeStamp}
                  </div>
                </div>
                <div>
                  {isEdit && UID === items.UID ?
                    <CustomInput inputValue={commentText} placeholder="Comment" setOnChange={handleComment} />
                    :
                    items.comment}
                </div>
                <div className="cs-dis-flex cs-tm-5">
                  <div className="cs-rm-12 cs-color-link-blue cs-fw-500 cs-pointer" onClick={() => handleReply(true, items.UID)}>
                    Reply
                  </div>
                  {isEdit && UID === items.UID ?
                    <div className="cs-color-link-blue cs-fw-500 cs-pointer" onClick={() => updateReply(commentText, items.UID)}>
                      Update
                    </div>
                    :
                    <div className="cs-color-link-blue cs-fw-500 cs-pointer" onClick={() => handleEdit(true, items.UID, items.comment)}>
                      Edit
                    </div>}
                </div>
                <div className="cs-delete-icon">
                  <DeleteOutlined className="cs-trash-icon cs-pointer" onClick={() => handleDelete(items.UID)} />
                </div>
              </div>
              {isReply && items.UID === UID ?
                <div className="cs-tm-10">
                  <CommentComponent userName={items.name} UID={items.UID} handleListingData={handleListingData} handleReply={handleReply} />
                </div>
                : null}
              {items.reply.map((nestedItems, ind) => {
                return (
                  <Row className="cs-float-right" key={ind}>
                    <Col span={23} className="cs-tm-10">
                      <div className="cs-comment-card cs-p-10">
                        <div className="cs-fw-600 cs-dis-flex cs-justify-content-sb">
                          <div>
                            {nestedItems.name}
                          </div>
                          <div>
                            {nestedItems.timeStamp}
                          </div>
                        </div>
                        <div>
                          {isEdit && UID === nestedItems.UID ?
                            <CustomInput inputValue={commentText} placeholder="Comment" setOnChange={handleComment} />
                            :
                            nestedItems.comment}
                        </div>
                        <div className="cs-dis-flex cs-tm-5">
                          {isEdit && UID === nestedItems.UID ?
                            <div className="cs-color-link-blue cs-fw-500 cs-pointer" onClick={() => updateReply(commentText, nestedItems.UID, items.UID)}>
                              Update
                            </div>
                            :
                            <div className="cs-color-link-blue cs-fw-500 cs-pointer" onClick={() => handleEdit(true, nestedItems.UID, nestedItems.comment)}>
                              Edit
                            </div>}
                        </div>
                        <div className="cs-delete-icon">
                          <DeleteOutlined className="cs-trash-icon cs-pointer" onClick={() => handleOnReplyDelete(items.UID, nestedItems.UID)} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                )
              })}
            </React.Fragment>
          )
        })}
      </> :
      <div className="cs-dis-flex cs-hrz-center">
        <h3>No Comments Found</h3>
      </div>}
  </div>
};

export default UserComment;
