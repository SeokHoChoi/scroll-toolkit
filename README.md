# 무한 스크롤 구현 프로젝트

## 기능 시연

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

  <!-- 기본 동작 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/38c3f6f4-fbcb-4fa9-abd5-5c4b0a9a6fec" alt="default" style="width: 300px; height: auto;">
    <p><strong>기본 동작</strong><br>이 GIF는 무한스크롤의 기본 동작을 보여줍니다.</p>
  </div>
  <br></br>

  <!-- 로딩 (스켈레톤) -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/7bba5a6a-adf8-48a9-8470-6f788f8cd81a" alt="loading" style="width: 300px; height: auto;">
    <p><strong>로딩</strong><br>
    데이터를 새롭게 불러올 때, 로딩 컴포넌트인 스켈레톤 UI가 렌더링됩니다. 이 컴포넌트는 사용자가 데이터를 기다리는 동안 시각적인 피드백을 제공하여, 사용자 경험을 개선합니다. 데이터 로딩이 완료되면 해당 컴포넌트는 언마운트되어 화면에서 사라지게 됩니다. 이를 통해 사용자는 데이터가 정상적으로 불러와졌음을 인지할 수 있습니다.
    </p>
  </div>
  <br></br>

  <!-- 에러 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/26c50ca2-ddda-42f7-817d-9b6760ea189d" alt="error" style="width: 300px; height: auto;">
    <p><strong>에러</strong><br>
    데이터를 불러오는 과정에서 에러가 발생하면, 에러 컴포넌트가 렌더링되어 사용자가 문제를 인식하고 대응할 수 있도록 돕습니다.
    </p>
  </div>
  <br></br>

  <!-- 가상 스크롤 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/62b7878a-94eb-4a10-8de7-536016c95c74" alt="v-scroll" style="width: 300px; height: auto;">
    <p><strong>가상 스크롤</strong><br>
    가상 스크롤은 화면에 보이지 않는 DOM 요소까지 모두 렌더링할 필요가 없기에 추가되었습니다. 일반적으로 대량의 데이터를 처리할 때, 모든 요소를 리렌더링하는 것은 성능에 부담이 될 수 있습니다. 따라서 화면에 실제로 보이는 요소들만 렌더링하여 불필요한 리렌더링을 방지합니다.
    </p>
  </div>
  <br></br>
  
</div>

## 프로젝트 개요

이 프로젝트는 Intersection Observer를 사용하여 무한 스크롤을 구현합니다. 사용자가 페이지를 스크롤할 때, 화면의 최하단에 도달하면 다음 페이지의 상품 리스트를 자동으로 가져옵니다. 현재 가져온 상품의 가격 총합도 화면에 표시됩니다.

## 기술 스택

- React
- TypeScript
- Intersection Observer API

## 주요 기능

1. **무한 스크롤**: 사용자가 페이지를 스크롤하여 최하단에 도달할 때 자동으로 추가 상품을 로드합니다.
2. **가격 총합 표시**: 현재 로드된 상품의 총 가격을 계산하여 화면에 표시합니다.
3. **로딩 UI**: 상품을 로드하는 동안 로딩 UI가 나타납니다.

## 주의 사항

1. 이 프로젝트는 제공된 Mock 데이터를 기반으로 하며, 데이터를 수정 및 추가할 수 있습니다.
2. 무한 스크롤 구현 시 외부 라이브러리는 사용하지 않았습니다.
3. 비동기 상태 관리 라이브러리는 사용하지 않았습니다.

## 실행 방법

1. **프로젝트를 클론**

- git clone [리포지토리 URL]
- cd [프로젝트 폴더명]

2. **의존성을 설치**

   ```bash
   npm install
   ```

3. **JSON Server 설정**

   - json-server를 개발 의존성으로 설치합니다

     ```bash
     npm install -D json-server
     ```

   - package.json 파일에 다음 스크립트를 추가

     ```json
     "dev:db": "json-server --watch db.json --port=8888"
     ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

5. **JSON Server 실행 다른 터미널에서 다음 명령어를 실행**

   ```bash
   npm run dev:db
   ```
