import { useState, useCallback } from 'react';

type StateType =
  | { type: 'pending'; errMsg: string }
  | { type: 'error'; errMsg: string }
  | { type: 'success'; errMsg: string }
  | { type: 'none'; errMsg: string };

export type StatusType = 'success' | 'pending' | 'error' | 'none';

type ReturnType = [
  { isLoadingState: boolean; isSuccessState: boolean; isErrorState: boolean; errMsg: string },
  (type: StatusType, msg?: string) => void
];

const useRequestState = (loading?: boolean): ReturnType => {
  const [state, setState] = useState<StateType>(loading ? { type: 'pending', errMsg: '' } : { type: 'none', errMsg: '' });

  const isLoadingState = state.type === 'pending';

  const isSuccessState = state.type === 'success';

  const isErrorState = state.type === 'error';

  const handleRequest = useCallback((status: StatusType, msg: string = '') => {
    setState({ type: status, errMsg: msg });
  }, []);

  return [{ isLoadingState, isSuccessState, isErrorState, errMsg: state.errMsg }, handleRequest];
};

export default useRequestState;
