import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { useThreadList } from "../hooks/useThreadList";
import axios from "axios";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import "../setting-axios";

type ThreadFormProps = {
  title: string;
};

export default function IndexPage(): React.ReactElement {
  const { data, mutate } = useThreadList();
  const { handleSubmit, control } = useForm<ThreadFormProps>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit: SubmitHandler<ThreadFormProps> = (data) => {
    console.log(data);
    axios
      .post<Thread>('/api/threads', data)
      .then(() => {
        mutate();
      })
      .catch((err) => {
        console.error(err);
      });
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h1">ふみみ掲示板</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">スレッド一覧</Typography>
        <Button onClick={handleOpen}>スレッド作成</Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "yellow",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              スレッド作成
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "スレッド名を入力してください",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="スレッド名"
                  />
                )}
              />
              <Box>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button type="submit">作成</Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Box>
      <Grid container spacing={2}>
        {data?.map((thread) => (
          <Grid item xs={12} md={6} key={thread.id}>
            <Link href={"threads/" + thread.id}>{thread.title}</Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
