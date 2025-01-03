import React from 'react';
import { UserEntity } from './data/entity/UserEntity';
const AppContext = React.createContext<{
    contextAccessToken: string,
    contextUserEntity: UserEntity | null,
    setContextUserEntity: (val: UserEntity | null) => void,
}>({
    contextAccessToken: '', 
    contextUserEntity: null,
    setContextUserEntity: (val: UserEntity | null) => void {},
});
export default AppContext;