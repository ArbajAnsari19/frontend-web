import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import styles from "../../styles/profile.module.css";
import { User } from "../../types";
import { GetSessionParams, getSession, useSession } from "next-auth/react";
import axiosInstance from "../api/axios";
import Question from "../../components/Question";

const VisQuestions: React.FC = () => {
  const session = useSession();

  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session.status != "loading") {
          const mail = session?.data?.user?.email;
          const getDetails = await axiosInstance.get(
            `/users/account/?email=${mail}`
          );
          const user: User = getDetails.data;
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [session.status]);
  console.log(session);
  console.log(user?.last_viewed_concept_videos);
  return (
    <Layout>
      <h1 className={styles.head}>Recently seen questions</h1>
      <div className={styles.question}>
        {user?.last_viewed_questions?.map((question) => {
          return <Question question={question} />;
        })}
      </div>
    </Layout>
  );
};

export default VisQuestions;
