import { MaskGenerator } from './mask-generator.interface';

export class MaskUtil {

  private static PHONE = '(000) 000-0000';
  private static DATE = '00/00/0000';
  private static ZIP = '00000-000';

  public static PHONE_MASK_GENERATOR: MaskGenerator = {
      generateMask: () =>  MaskUtil.PHONE,
  }
  public static DATE_MASK_GENERATOR: MaskGenerator = {
    generateMask: () =>  MaskUtil.DATE,
};
public static ZIP_MASK_GENERATOR: MaskGenerator = {
  generateMask: () =>  MaskUtil.ZIP,
};


}
