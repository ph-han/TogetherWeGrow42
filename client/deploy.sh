#!/bin/bash

TARGET_DEVICE="mac"

PACKAGE_TARGET="clientApp"

OUTPUT_DIR="./"

# 색상 코드 정의
GREEN='\033[0;32m'
NC='\033[0m' # 색상 초기화

echo "==============================="
printf "${GREEN}Ares Package Information${NC}\n"
echo "==============================="
npm run pack -p --prefix ./$PACKAGE_TARGET
ares-package "$PACKAGE_TARGET/dist" -o $OUTPUT_DIR
echo "==============================="

# .ipk 파일 검색 (가장 최근에 수정된 파일)
INSTALL_IPK_FILE=$(ls -t ./*.ipk 2>/dev/null | head -1)

# 파일이 있는지 확인
if [ -z "$INSTALL_IPK_FILE" ]; then
  echo "Error: .ipk 파일을 찾을 수 없습니다."
  exit 1
else
  echo "Installing: $INSTALL_IPK_FILE"
  ares-install "$INSTALL_IPK_FILE" -d $TARGET_DEVICE -v
fi
