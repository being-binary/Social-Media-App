import React, { useState } from 'react';
import { Card, Avatar, Button, Input, Row, Col, Typography, Space } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined, SmileOutlined, LikeFilled } from '@ant-design/icons'; // Updated imports
const { Text } = Typography;
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineReplyAll } from "react-icons/md";
import PostCardCarousel from './subComponents/PostCardCarousel';

import { useSelector } from 'react-redux';
import axiosInstance from '../api/AxiosInstance';
import { toasterror, toastsuccess } from './Toast';
import { Link, Navigate } from 'react-router-dom';

const PostCardComponent = (props) => {
    const post = props.value.post
    const user = useSelector((state) => state.user)
    const [likes, setLikes] = useState(post.likes?.length || 0); // Initial number of likes
    const [liked, setLiked] = useState(post.likes.includes(user.entities._id)); // Like button state
    const [showComments, setShowComments] = useState(false); // Show/Hide comments
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);


    const toggleLike = async () => {
        console.log(`/post/like/${post._id}`)
        console.log(post)
        if (post.likes.includes(user.entities._id)) {
            const res = await axiosInstance.put(`/post/like/${post._id}`)
            const data = res.data
        } else {
            const res = await axiosInstance.put(`/post/like/${post._id}`)
            const data = res.data
        }
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1); // Increase/decrease like count
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const addComment = async () => {
        if (newComment.trim()) {
            const response = await axiosInstance.put(`/post/comment/${post._id}`, { comment: newComment })
            const data = response.data
            if (data.success) {
                toastsuccess(data.msg)
                setComments([...comments, {user:user.entities, text:newComment, reply:[]}])
                setNewComment('');
            } else {
                toasterror(data.msg)
            }

        }
    };

    const addReply = (index) => {
        if (newReply.trim()) {
            const updatedComments = [...comments];
            updatedComments[index].replies.push({ user: 'You', text: newReply });
            setComments(updatedComments);
            setNewReply('');
            setReplyingTo(null);
        }
    };

    const toggleCommentLike = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].likes += 1; // Increment likes for the comment
        setComments(updatedComments);
    };
    return (
        <Card
            style={{ width: 500, margin: '10px auto', borderRadius: 10, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
            {/* Post Header */}
            <Row align="middle" gutter={16} style={{ borderBottom: '1px solid black', margin: "0 0 7px 0", paddingBottom: '10px' }}>
                <Col>
                    <Avatar style={{ width: '50px', height: '50px' }} src={post?.userId?.profilePic?.secure_url} />
                </Col>
                <Col>
                    <Link to={'/user/friend'} state={post.userId?._id===user.entities?._id ? <Navigate to={'/post/userpost'} /> : post.userId?._id}>
                        <Text strong>{post.userId?.name.firstName + ' ' + post.userId?.name.lastName}</Text>
                    </Link>
                </Col>
                <Col style={{ marginLeft: 'auto' }}>
                    <Button shape="circle" icon={<SmileOutlined />} />
                </Col>
            </Row>


            {post?.media?.length > 0 && <PostCardCarousel value={{ media: [...post.media] }} />}

            {!(post?.media?.length > 0) && <Text>{post.title}</Text>}
            {!(post?.media?.length > 0) && <Text>{post?.description}</Text>}

            {/* Post Actions */}
            <Space style={{ width: '100%', marginTop: '20px' }}>
                <Button
                    shape="circle"
                    icon={<LikeOutlined />}
                    onClick={toggleLike}
                    style={{ color: liked ? 'red' : 'black' }}
                />
                <Button shape="circle" icon={<CommentOutlined />} onClick={toggleComments} />
                <Button shape="circle" icon={<ShareAltOutlined />} />
                <Button shape="circle" icon={<FaRegBookmark />} />
            </Space>

            {/* Likes count */}
            <Text strong style={{ display: 'block', margin: "10px 0 0 0" }}>{likes} Likes</Text>

            {/* Post Description */}
            <Text style={{ display: 'block', marginTop: 10 }}>
                <Text strong>{post.userId?.name.firstName + ' ' + post.userId?.name.lastName}</Text> {post?.media.length > 0 && post.title}
            </Text>


            {/* Show/Hide comments */}
            {showComments && (
                <div style={{ marginTop: '10px' }}>
                    <Text strong>Comments</Text>
                    {comments.map((comment, index) => (
                        <div key={index} style={{ marginTop: '10px' }}>
                            <Text strong>{comment?.user.name.firstName}&nbsp;{comment?.user.name.lastName}:</Text> {comment.text}
                            <Button
                                type="link"
                                icon={<LikeFilled />}
                                onClick={() => toggleCommentLike(index)}
                                style={{ padding: 0, marginLeft: 8 }}
                            >
                                {comment.likes} Likes
                            </Button>
                            {comment.reply.length > 0 && (
                                <div style={{ marginLeft: '20px' }}>
                                    {comment.replies.map((reply, replyIndex) => (
                                        <div key={replyIndex}>
                                            <Text strong>{reply.user}:</Text> {reply.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Button
                                type="link"
                                icon={<MdOutlineReplyAll />}
                                onClick={() => setReplyingTo(index)}
                                style={{ padding: 0 }}
                            >
                                Reply
                            </Button>

                            {replyingTo === index && (
                                <div style={{ marginTop: '10px' }}>
                                    <Input
                                        value={newReply}
                                        onChange={(e) => setNewReply(e.target.value)}
                                        onPressEnter={() => addReply(index)}
                                        placeholder="Write a reply..."
                                        style={{ marginBottom: '5px' }}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => addReply(index)}
                                        style={{ marginTop: '5px' }}
                                    >
                                        Post Reply
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Comment */}
            <div style={{ marginTop: '20px' }}>
                <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onPressEnter={addComment}
                    placeholder="Add a comment..."
                />
                <Button
                    type="primary"
                    onClick={addComment}
                    style={{ marginTop: '10px', width: '100%' }}
                >
                    Post Comment
                </Button>
            </div>
        </Card>
    );
};

export default PostCardComponent;
