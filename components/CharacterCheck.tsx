import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useLanguage } from '@/hooks/useLanguage';

const CharacterCheck = ({
  playerName,
  addAdmin,
}: {
  playerName: string;
  addAdmin?: boolean;
}) => {
  const { content, isLoading, error } = useLanguage();
  const labels = content?.labels;

  if (isLoading || error) return null;

  return (
    <ThemedView
      style={{
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        position: 'absolute',
        left: addAdmin ? 45 : 25,
        bottom: addAdmin ? -10 : 85,
      }}
    >
      <Ionicons name='alert-circle-outline' size={20} />
      <ThemedText type='default'>
        {playerName.length <= 2 && labels.minChars}
        {playerName.length >= 10 && labels.maxChars}
      </ThemedText>
    </ThemedView>
  );
};

export default CharacterCheck;
