import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Page, TaskForm, TaskItem, TaskList } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";
export function TaskDetail() {
  const params = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const get_task = async () => {
      const { id } = params;
      if (!id) {
        console.error("Task fetch failed");
        return;
      }
      const cur_task = await getTask(id);
      if (cur_task.success) {
        setTask(cur_task.data);
      } else {
        console.error("Task fetch failed");
      }
    };

    void get_task();
  }, [params]);

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <Page>
      <title>Home | TSE Todos</title>
      <p>
        {/* `<Link>` renders an `<a>` element with a correct `href` attribute
        but uses the react-router library's client-side routing so the new page
        loads faster (see https://reactrouter.com/en/main/components/link) */}
        <Link to="/">Back to Home </Link>
      </p>

      <div className="container">
        {task ? (
          <div className="taskDetail">
            <div className={styles.headerRow}>
              <h1>Title: {task.title}</h1>
              <button type="button" className={styles.editButton}>
                Edit Task
              </button>
            </div>
            <p>{task.description}</p>

            {/* Safer access using optional chaining */}
            <p>
              {" "}
              <strong>Assignee:</strong> {task.assignee?.name ?? "None"}
            </p>

            <p>
              {" "}
              <strong> Status: </strong> {task.isChecked ? "Done" : "TODO"}
            </p>

            <p>
              <strong> Date created: </strong> {formatter.format(task.dateCreated)}
            </p>
          </div>
        ) : (
          <p className={styles.no_exist}>This task doesn't exist!</p>
        )}
      </div>
    </Page>
  );
}
