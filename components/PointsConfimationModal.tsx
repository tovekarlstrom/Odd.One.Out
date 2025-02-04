import { ButtonComponent } from './ButtonComponent';
import { ModalComponent } from './Modal';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import data from '../public/content.json';

export const PointsConfimationModal = ({
  playerGetPoints,
  onClose,
  onConfirm,
}: {
  playerGetPoints: string[];
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const lables = data?.content?.labels || {};
  const descriptions = data?.content?.descriptions || {};
  const buttons = data?.content?.buttons || {};

  console.log('getPlayerPoints', playerGetPoints);
  if (playerGetPoints.length === 1) {
    return (
      <ModalComponent onClose={onClose} heading={lables.canNotProceed}>
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
    <ModalComponent onClose={onClose} heading={lables.safetyCheck}>
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
