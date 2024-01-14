import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useThreadList } from "../hooks/useThreadList";

export default function IndexPage(): React.ReactElement {
    const {threadList} = useThreadList();

  return (
    <>
    <Typography variant="h1">
        スレッド一覧
    </Typography>
    <Grid container spacing={2}>
        {threadList.map((thread) => (
            <Grid item xs={12} md={6} key={thread.id}>
                <Link href={'threads/' + thread.id}>
                    {thread.title}
                </Link>
            </Grid>
        ))}
    </Grid>
    </>
  );
}
