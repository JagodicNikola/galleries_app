import HttpService from "./HttpService";

class CommentService extends HttpService{
    createComment = async (comment, galleryId) => {
        const { data } = await this.client.post(`/galleries/${galleryId}/comments`, comment);
        return data;
    }

    deleteComment = async (comment) => {
        const { data } = await this.client.delete(`/comment/${comment}`);
        return data;
    }

}

const commentService = new CommentService();
export default commentService;