import React, { useCallback, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, useWindowDimensions, Platform } from 'react-native';
import { RichEditor, actions } from 'react-native-pell-rich-editor';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Container, Editor, RichToolbar } from './styles';

const initHTML = `<br/>
 <center><b onclick="_.sendEvent('TitleClick')" id="title" contenteditable="false">Rich Editor</b></center>
 <br/>
 <pre type="javascript"><code>const editor = ReactNative;</code><code>console.log(editor);</code></pre>
 <br/>Click the picture to switch<br/><br/>
 `;

export function PellRichEditor(props) {
  const richText = useRef();
  const scrollRef = useRef();
  const handleCursorPosition = useCallback((scrollY) => {
    scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  }, []);
  const { height: windowHight } = useWindowDimensions();

  const onPressAddImage = useCallback(() => {
    // insert URL
    richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
      // 'background: gray;',
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }, []);

  useEffect(() => {
    if (Platform.OS == 'ios') {
      StatusBar.setBarStyle('light-content');
    }
  });

  return (
    <Container>
      <StatusBar backgroundColor="#1E2832" barStyle="light-content" />

      <Editor>
        <ScrollView
          keyboardDismissMode={'none'}
          ref={scrollRef}
          nestedScrollEnabled={true}
          scrollEventThrottle={20}
        >
          <RichEditor
            ref={richText}
            useContainer={true}
            initialContentHTML={initHTML}
            onCursorPosition={handleCursorPosition}
            pasteAsPlainText={true}
            initialHeight={windowHight - getBottomSpace() - 44}
          />
        </ScrollView>
      </Editor>
      <RichToolbar
        editor={richText}
        selectedIconTint={'#2095F2'}
        disabledIconTint={'#bfbfbf'}
        actions={[
          actions.undo,
          actions.redo,

          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertImage,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.indent,
          actions.outdent,

          actions.insertLink,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.alignFull,
        ]}
        // TODO: FontSize, FontFamily, FontColor (Custom CSS + sendEvent)
        onPressAddImage={onPressAddImage}
      />
    </Container>
  );
}
