import { ModalComponent } from './Modal';
import { useLanguage } from '@/hooks/useLanguage';

export const PointsConfimationModal = ({
  playerGetPoints,
  onClose,
  onConfirm,
}: {
  playerGetPoints: string[];
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const { content, isLoading, error } = useLanguage();
  const labels = content?.labels;
  const descriptions = content?.descriptions;

  if (isLoading || error) return null;

  if (playerGetPoints.length === 1) {
    return (
      <ModalComponent
        onClose={onClose}
        heading={labels.canNotProceed}
        description={descriptions.wrongPoints}
        oneButton
      />
    );
  }

  return (
    <ModalComponent
      onClose={onClose}
      onContinue={onConfirm}
      heading={labels.safetyCheck}
      description={descriptions.safetyCheckPoints}
      twoButtons
    />
  );
};
