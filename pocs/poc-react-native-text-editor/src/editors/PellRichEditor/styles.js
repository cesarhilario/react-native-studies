import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { RichToolbar as PellRichToolbar } from 'react-native-pell-rich-editor';

export const Container = styled(SafeAreaView)`
  background-color: #1e2832;
  flex: 1;
`;

export const Editor = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const RichToolbar = styled(PellRichToolbar)`
  background: #1e2832;
  padding: 10px;
`;
