import { Dialog } from "@tritonse/tse-constellation";
import React, { useState } from "react"; // update this line
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";
export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const handleToggleCheck = async () => {
    const res = await updateTask({ ...task, isChecked: !task.isChecked });
    if (res.success) {
      setTask(res.data);
      setLoading(true);
    } else {
      setErrorModalMessage(res.error);
    }
    setLoading(false);
  };

  // ...

  let base_class = styles.textContainer;
  if (task.isChecked) base_class += ` ${styles.checked}`;
  return (
    <div className={styles.item}>
      {
        <CheckButton
          checked={task.isChecked}
          onPress={() => {
            void handleToggleCheck();
          }}
          disabled={isLoading}
        />
      }
      <div className={base_class}>
        <span>{task.title}</span>
        {task.description && <span>{task.description}</span>}
      </div>

      <Dialog
        styleVersion="styled"
        variant="error"
        title="An error occurred"
        // Override the text color so it doesn't show white text on a white background
        content={<p className={styles.errorModalText}>{errorModalMessage}</p>}
        isOpen={errorModalMessage !== null}
        onClose={() => setErrorModalMessage(null)}
      />
    </div>
  );
}
