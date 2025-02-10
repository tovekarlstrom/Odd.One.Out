import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';

export const getStatus = async (
  documentId: string | undefined,
  setStatus: (arg0: string) => void,
) => {
  if (documentId) {
    await getOrUpdateStatus({ documentId, setStatus });
  }
};
