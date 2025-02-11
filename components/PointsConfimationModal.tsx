import { ButtonComponent } from './ButtonComponent';
import { ModalComponent } from './Modal';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
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
  const buttons = content?.buttons;

  if (isLoading || error) return null;

  if (playerGetPoints.length === 1) {
    return (
      <ModalComponent onClose={onClose} heading={labels.canNotProceed}>
        <ThemedText type='default' style={{ marginBottom: 20 }}>
          {descriptions.wrongPoints}
        </ThemedText>
        <ButtonComponent
          onSubmit={onClose}
          text={buttons.ok}
          variant='primary'
        />
      </ModalComponent>
    );
  }

  return (
    <ModalComponent onClose={onClose} heading={labels.safetyCheck}>
      <ThemedText
        type='default'
        style={{ marginBottom: 20, marginHorizontal: 5 }}
      >
        {descriptions.safetyCheckPoints}
      </ThemedText>
      <ThemedView>
        <ButtonComponent
          onSubmit={() => {
            onConfirm();
            onClose();
          }}
          text={buttons.yes}
          variant='primary'
        />
        <ButtonComponent
          onSubmit={onClose}
          text={buttons.no}
          variant='secondary'
        />
      </ThemedView>
    </ModalComponent>
  );
};
