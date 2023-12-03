export const getMemberIdFromLocal = (): number | null => {
  // localStorage에서 가져온 값이 null 또는 undefined일 경우, 기본값으로 null 반환
  const storedMemberId = localStorage.getItem("memberId") || null;

  // 숫자로 변환하여 반환
  return storedMemberId ? parseInt(storedMemberId, 10) : null;
};
