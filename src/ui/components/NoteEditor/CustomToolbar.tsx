import React from 'react';
import {
  FormattingToolbar,
  FormattingToolbarController,
  BlockTypeSelect,
  BasicTextStyleButton,
  TextAlignButton,
  NestBlockButton,
  UnnestBlockButton,
  CreateLinkButton,
  ImageCaptionButton,
  ReplaceImageButton,
} from '@blocknote/react';

const CustomToolbar: React.FC = () => {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          <BlockTypeSelect key={'blockTypeSelect'} />

          <ImageCaptionButton key={'imageCaptionButton'} />
          <ReplaceImageButton key={'replaceImageButton'} />

          <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />
          {/* Extra button to toggle code styles */}
          <BasicTextStyleButton key={'codeStyleButton'} basicTextStyle={'code'} />

          <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
          <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />
          <TextAlignButton textAlignment={'right'} key={'textAlignRightButton'} />

          <NestBlockButton key={'nestBlockButton'} />
          <UnnestBlockButton key={'unnestBlockButton'} />

          <CreateLinkButton key={'createLinkButton'} />
        </FormattingToolbar>
      )}
    />
  );
};

export default CustomToolbar;
