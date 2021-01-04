import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import LogoHeader from './LogoHeader';
import { WrapperLayout, AppWrapper } from './AppStyle';
import MenuLeft from './MenuLeft';
import { Layout, Affix } from 'antd';
import HomePage from 'app/pages/HomePage';
import AddStudent from 'app/pages/Student/AddStudent';
import CreateTest from 'app/pages/CreateTest';
import AddQuestions from 'app/pages/AddQuestions';
import EditTestInfo from 'app/pages/EditTestInfo';
import TestList from 'app/pages/TestList';
import PreviewTest from 'app/pages/PreviewTest';
import Intro from 'app/pages/Intro';
import Quiz from 'app/pages/Quiz';
import Practice from 'app/pages/Practice';
import PracticeInfo from 'app/pages/Practice/PracticeInfo';
import Contact from 'app/pages/Contact';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import ModalManager from 'app/components/ModalManager';
import Login from 'app/pages/Login';
import Register from 'app/pages/Register';
import { PrivateRoute } from 'app/components/PrivateRoute';
import StartTest from 'app/pages/Quiz/StartTest';
import QuizInfo from 'app/pages/Quiz/QuizInfo';
import ViewQuiz from 'app/pages/ViewQuiz';
import ChildQuiz from 'app/pages/ChildQuiz';
// import ViewResult from 'app/pages/ViewResult';
import StudentList from 'app/pages/Student/StudentList';
import StudentProfile from 'app/pages/Student/StudentProfile';
import StudentQuiz from 'app/pages/Student/StudentQuiz';
import StudentPractice from 'app/pages/Student/StudentPractice';
import StudentDoTest from 'app/pages/Student/StudentDoTest';
import StudentDoPractice from 'app/pages/Student/StudentDoPractice';
import ViewHistory from 'app/pages/Student/StudentDoPractice/ViewHistory';
import OverviewOnePractice from 'app/pages/Student/StudentDoPractice/ViewHistory/OverviewOnePractice';
import ViewResult from 'app/pages/Student/StudentDoTest/ViewResult';
import ViewPracticeResult from 'app/pages/Student/StudentDoPractice/ViewPracticeResult';
import EditStudent from 'app/pages/Student/EditStudent';
import GlobalStyle from 'GlobalStyle';
import { ViewScore } from 'app/pages/ViewScore';
import ViewAccount from 'app/pages/Account/ViewAccount';
import EditAccount from 'app/pages/Account/EditAccount';
import ChangePassword from 'app/pages/Account/ChangePassword';
import ScrollToTop from 'app/components/ScrollToTop';
import ForgetPassword from 'app/pages/Intro/ForgetPass';
import VerifyNewPassword from 'app/pages/Intro/VerifyNewPass';
import SuccessNewPassword from 'app/pages/Intro/SuccessNewPass';
import VerifySignup from 'app/pages/Intro/VerifySignup';
import SuccessSignup from 'app/pages/Intro/SuccessSignup';
import ViewResultOnePractice from 'app/pages/Student/StudentDoPractice/ViewHistory/ViewResultOnePractice';

function App() {
  const [top, setTop] = useState(0);
  const { Content } = Layout;
  return (
    <ThemeProvider theme={theme}>
      <ModalManager />
      <GlobalStyle />
      <AppWrapper className='app'>
        <ScrollToTop>
          <Switch>
            <Route path={['/login', '/']} exact>
              <WrapperLayout>
                <Login />
              </WrapperLayout>
            </Route>
            <Route path='/register' exact>
              <WrapperLayout>
                <Register />
              </WrapperLayout>
            </Route>
            <Route path='/forget-password' exact>
              {/* <Affix offsetTop={top}>
                <LogoHeader />
              </Affix> */}
              <WrapperLayout>
                {/* <Content> */}
                <ForgetPassword />
                {/* </Content> */}
              </WrapperLayout>
            </Route>
            <Route path='/forget-password/verify-email' exact>
              {/* <Affix offsetTop={top}>
                <LogoHeader />
              </Affix> */}
              <WrapperLayout>
                <Content>
                  <VerifyNewPassword />
                </Content>
              </WrapperLayout>
            </Route>
            <Route path='/forget-password/success' exact>
              {/* <Affix offsetTop={top}>
                <LogoHeader />
              </Affix> */}
              <WrapperLayout>
                <Content>
                  <SuccessNewPassword />
                </Content>
              </WrapperLayout>
            </Route>
            <Route path='/signup/verify-email' exact>
              <Affix offsetTop={top}>
                <LogoHeader />
              </Affix>
              <WrapperLayout>
                <Content>
                  <VerifySignup />
                </Content>
              </WrapperLayout>
            </Route>
            <Route path='/signup/success' exact>
              <Affix offsetTop={top}>
                <LogoHeader />
              </Affix>
              <WrapperLayout>
                <Content>
                  <SuccessSignup />
                </Content>
              </WrapperLayout>
            </Route>
            <Route path={['/intro']} exact>
              <Intro />
            </Route>

            <Route path='/(.+)'>
              <Affix offsetTop={top}>
                <LayoutHeader />
              </Affix>
              <WrapperLayout>
                {/* <Affix offsetTop={0}>
                <MenuLeft />
              </Affix> */}
                <MenuLeft />
                <Switch>
                  {/* Setup router in here */}
                  <PrivateRoute path='/home' exact>
                    <Content
                      className='site-layout'
                      style={{ paddingLeft: '260px', paddingTop: '40px' }}
                    >
                      <HomePage />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/account' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '10px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <ViewAccount />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/edit-account' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '40px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <EditAccount />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/change-password' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '40px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <ChangePassword />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/add-student' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <AddStudent />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/create-test' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <CreateTest />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/add-questions/:id' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <AddQuestions />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/edit-test-info/:id' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <EditTestInfo />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/test-list' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <TestList />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/preview-test/:id' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <PreviewTest />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-list' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '30px',
                        paddingRight: '40px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <StudentList />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-quiz/:studentId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <StudentQuiz />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-quiz/do-test/:combinedId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <StudentDoTest />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-quiz/do-test/:combinedId/view-result' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <ViewResult />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-quiz/:status/:combinedId/:quizId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <QuizInfo />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/Quiz-info/:quizId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <QuizInfo />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-profile/:studentId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <StudentProfile />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/edit-student/:studentId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        // paddingLeft: '210px',
                        // paddingTop: '10px',
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <EditStudent />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/practice' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <Practice />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-practice/:studentId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <StudentPractice />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/practice/:quizId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <PracticeInfo />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/practice/:quizId/:studentId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <PracticeInfo />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-practice/:status/:quizId/:studentId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <PracticeInfo />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-practice/do-practice/:combinedId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <StudentDoPractice />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/student-practice/:combinedId/view-result' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <ViewPracticeResult />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/practice-history/:studentId/:combinedId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <ViewHistory />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/practice-history/:studentId/:combinedId/:practiceId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <OverviewOnePractice />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/practice-history/:studentId/:combinedId/:practiceId/view-result' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '10px',
                        paddingRight: '20px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <ViewResultOnePractice />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/quiz' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '280px',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        backgroundColor: '#F6F8F8'
                      }}
                    >
                      <Quiz />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/quiz/overview' exact>
                    <Content
                      className='site-layout'
                      style={{ padding: '0px 0px' }}
                    >
                      <StartTest />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/quiz/:quizId/:userId' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingLeft: '260px',
                        paddingTop: '40px',
                        paddingRight: '40px'
                      }}
                    >
                      <StartTest />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/quiz/:quizId/:userId/score' exact>
                    <Content
                      className='site-layout'
                      style={{ padding: '40px 60px' }}
                    >
                      <ViewScore />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/quiz/:quizId/:userId/result' exact>
                    <Content
                      // className='site-layout'
                      style={{ paddingLeft: '70px', paddingTop: '40px' }}
                    >
                      <ViewResult />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/contact' exact>
                    <Content
                      className='site-layout'
                      style={{ padding: '0px 0px' }}
                    >
                      <Contact />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/view-quiz' exact>
                    <Content
                      className='site-layout'
                      style={{ padding: '0px 0px' }}
                    >
                      <ViewQuiz />
                    </Content>
                  </PrivateRoute>
                  <PrivateRoute path='/child-quiz' exact>
                    <Content
                      className='site-layout'
                      style={{
                        paddingTop: '20px',
                        paddingLeft: '260px',
                        paddingRight: '40px'
                      }}
                    >
                      <ChildQuiz />
                    </Content>
                  </PrivateRoute>
                  <Route path='/notfound' exact>
                    <Content
                      className='site-layout'
                      style={{ padding: '0px 0px' }}
                    >
                      <div> page not found</div>
                    </Content>
                  </Route>
                </Switch>
                {/* Setup router in here */}
              </WrapperLayout>
            </Route>
          </Switch>
        </ScrollToTop>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

