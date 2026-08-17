declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    message?: string;
    data?: LoginUserVO;
  };

  type BaseResponseLong = {
    code?: number;
    message?: string;
    data?: number;
  };

  type BaseResponsePageQuestion = {
    code?: number;
    message?: string;
    data?: PageQuestion;
  };

  type BaseResponsePageQuestionBank = {
    code?: number;
    message?: string;
    data?: PageQuestionBank;
  };

  type BaseResponsePageQuestionBankQuestion = {
    code?: number;
    message?: string;
    data?: PageQuestionBankQuestion;
  };

  type BaseResponsePageQuestionBankQuestionVO = {
    code?: number;
    message?: string;
    data?: PageQuestionBankQuestionVO;
  };

  type BaseResponsePageQuestionBankVO = {
    code?: number;
    message?: string;
    data?: PageQuestionBankVO;
  };

  type BaseResponsePageQuestionVO = {
    code?: number;
    message?: string;
    data?: PageQuestionVO;
  };

  type BaseResponsePageUser = {
    code?: number;
    message?: string;
    data?: PageUser;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    message?: string;
    data?: PageUserVO;
  };

  type BaseResponseQuestionBankQuestionVO = {
    code?: number;
    message?: string;
    data?: QuestionBankQuestionVO;
  };

  type BaseResponseQuestionBankVO = {
    code?: number;
    message?: string;
    data?: QuestionBankVO;
  };

  type BaseResponseQuestionVO = {
    code?: number;
    message?: string;
    data?: QuestionVO;
  };

  type BaseResponseUser = {
    code?: number;
    message?: string;
    data?: User;
  };

  type BaseResponseUserVO = {
    code?: number;
    message?: string;
    data?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getQuestionBankQuestionVOByIdParams = {
    id: number;
  };

  type getQuestionBankVOByIdParams = {
    questionBankQueryRequest: QuestionBankQueryRequest;
  };

  type getQuestionVOByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    phoneNumber?: string;
    email?: string;
    grade?: string;
    workExperience?: string;
    expertiseDirection?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageQuestion = {
    records?: Question[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageQuestion;
    searchCount?: PageQuestion;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionBank = {
    records?: QuestionBank[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageQuestionBank;
    searchCount?: PageQuestionBank;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionBankQuestion = {
    records?: QuestionBankQuestion[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageQuestionBankQuestion;
    searchCount?: PageQuestionBankQuestion;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionBankQuestionVO = {
    records?: QuestionBankQuestionVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageQuestionBankQuestionVO;
    searchCount?: PageQuestionBankQuestionVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionBankVO = {
    records?: QuestionBankVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageQuestionBankVO;
    searchCount?: PageQuestionBankVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionVO = {
    records?: QuestionVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageQuestionVO;
    searchCount?: PageQuestionVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUser;
    searchCount?: PageUser;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type Question = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string;
    answer?: string;
    userId?: number;
    priority?: number;
    editTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type QuestionAddRequest = {
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
  };

  type QuestionBank = {
    id?: number;
    title?: string;
    description?: string;
    picture?: string;
    userId?: number;
    priority?: number;
    editTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type QuestionBankAddRequest = {
    title?: string;
    description?: string;
    picture?: string;
  };

  type QuestionBankQueryRequest = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number | string;
    notId?: number;
    searchText?: string;
    title?: string;
    description?: string;
    picture?: string;
    userId?: number;
    needQueryQuestionList?: boolean;
  };

  type QuestionBankQuestion = {
    id?: number;
    questionBankId?: number;
    questionId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type QuestionBankQuestionAddRequest = {
    questionBankId?: number;
    questionId?: number;
  };

  type QuestionBankQuestionQueryRequest = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    notId?: number;
    questionBankId?: number;
    questionId?: number;
    userId?: number;
  };

  type QuestionBankQuestionRemoveRequest = {
    questionBankId?: number;
    questionId?: number;
  };

  type QuestionBankQuestionUpdateRequest = {
    id?: number;
    questionBankId?: number;
    questionId?: number;
  };

  type QuestionBankQuestionVO = {
    id?: number;
    questionBankId?: number;
    questionId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    tagList?: string[];
    user?: UserVO;
  };

  type QuestionBankUpdateRequest = {
    id?: number;
    title?: string;
    description?: string;
    picture?: string;
  };

  type QuestionBankVO = {
    id?: number;
    title?: string;
    description?: string;
    picture?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    user?: UserVO;
    questionPage?: PageQuestionVO;
  };

  type QuestionQueryRequest = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    notId?: number;
    searchText?: string;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    questionBankId?: number;
    userId?: number;
  };

  type QuestionUpdateRequest = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
  };

  type QuestionVO = {
    id?: number;
    title?: string;
    content?: string;
    answer?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    tagList?: string[];
    user?: UserVO;
  };

  type User = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    editTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserEditRequest = {
    phoneNumber?: string;
    email?: string;
    grade?: string;
    workExperience?: string;
    expertiseDirection?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };
}
