export function getHeadDirection(result) {
  if (!result?.faceLandmarks?.length) {
    return "NO_FACE";
  }

  const landmarks = result.faceLandmarks[0];

  // Nose
  const nose = landmarks[1];

  // Left eye
  const leftEye = landmarks[33];

  // Right eye
  const rightEye = landmarks[263];

  // Forehead
  const forehead = landmarks[10];

  // Chin
  const chin = landmarks[152];

  const eyeCenterX = (leftEye.x + rightEye.x) / 2;
  const eyeCenterY = (leftEye.y + rightEye.y) / 2;

  // Left / Right
  const horizontal = nose.x - eyeCenterX;

  // Up / Down
  const vertical = nose.y - (forehead.y + chin.y) / 2;

  if (horizontal > 0.035) return "RIGHT";
  if (horizontal < -0.035) return "LEFT";

  if (vertical > 0.06) return "DOWN";
  if (vertical < -0.06) return "UP";

  return "CENTER";
}
