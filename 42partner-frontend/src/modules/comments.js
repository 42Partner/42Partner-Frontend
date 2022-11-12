const CHANGE_INPUT = 'comment/CHANGE_INPUT';
const CREATE = 'comment/CREATE';
const VIEWALL = 'comment/VIEWALL';
const EDIT = 'comment/EDIT';
const DELETE = 'comment/DELETE';

export const changeInput = (input) => ({ type: CHANGE_INPUT, input });
export const createComment = (articleId, content, level, parentId) => ({
  type: CREATE,
  commentInfo: {
    articleId,
    content,
    level,
    parentId,
  },
});
export const viewAllComment = (valueCount, values) => ({
  type: VIEWALL,
  allComment: {
    valueCount,
    values,
  },
});
export const editComment = (opinionId, content) => ({
  type: EDIT,
  opinionId,
  content,
});
export const deleteComment = (opinionId) => ({ type: DELETE, opinionId });

const initialState = {
  input: '',
  commentInfo: {
    articleId: '',
    content: '',
    level: 1,
    parentId: '',
    opinionId: '',
  },
  allComment: {
    valueCount: 0,
    values: '',
  },
};

// eslint-disable-next-line default-param-last
function comments(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case CREATE:
      return {
        ...state,
        commentInfo: action.commentInfo,
      };
    case VIEWALL:
      return {
        ...state,
        allComment: action.allComment,
      };
    case EDIT:
      return {
        ...state,
        commentInfo: state.commentInfo.map((comment) =>
          comment.opinionId === action.opinionId
            ? { ...comment, content: action.content }
            : comment,
        ),
      };
    case DELETE:
      return {
        ...state,
        commentInfo: state.commentInfo.filter(
          (comment) => comment.opinionId !== action.opinionId,
        ),
      };
    default:
      return state;
  }
}

export default comments;
