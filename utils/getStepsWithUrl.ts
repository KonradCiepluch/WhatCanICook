import { IStep } from 'context/DetailsProvider/types';
import { uploadImage } from 'lib/firebaseData';

interface IStepUrl {
  description: string;
  photo?: string;
  videoUrl?: string;
}

const getStepsWithUrl = async (steps: IStep[]) => {
  const stepsWithUrl: IStepUrl[] = [];

  try {
    for (let i = 0; i < steps.length; i++) {
      const { photo, description, url } = steps[i];

      let photoUrl = '';

      if (photo) {
        photoUrl = await uploadImage(photo);
      }

      stepsWithUrl.push({ description, photo: photoUrl, videoUrl: url });
    }
    return stepsWithUrl;
  } catch (e) {
    throw new Error(e);
  }
};

export default getStepsWithUrl;
