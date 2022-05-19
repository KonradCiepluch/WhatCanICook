import { useState, useCallback } from 'react';

type StateType =
  | { type: 'pending'; errMsg: string }
  | { type: 'error'; errMsg: string }
  | { type: 'success'; errMsg: string }
  | { type: 'none'; errMsg: string };

export type StatusType = 'success' | 'pending' | 'error' | 'none';

type ReturnType = [
  { isLoadingState: boolean; isSuccessState: boolean; isErrorState: boolean; errMsg: string },
  (handler: () => Promise<void>, msg?: string) => Promise<void>,
  () => void
];

const useRequestState = (loading?: boolean): ReturnType => {
  const [state, setState] = useState<StateType>(loading ? { type: 'pending', errMsg: '' } : { type: 'none', errMsg: '' });

  const isLoadingState = state.type === 'pending';

  const isSuccessState = state.type === 'success';

  const isErrorState = state.type === 'error';

  const handleRequest = useCallback(async (handler: () => Promise<void>, msg?: string) => {
    setState({ type: 'pending', errMsg: '' });
    try {
      await handler();
      setState({ type: 'success', errMsg: '' });
    } catch (e) {
      setState({ type: 'error', errMsg: msg || e.message });
    }
  }, []);

  const handleResetRequest = useCallback(() => setState({ type: 'none', errMsg: '' }), []);

  return [{ isLoadingState, isSuccessState, isErrorState, errMsg: state.errMsg }, handleRequest, handleResetRequest];
};

export default useRequestState;
