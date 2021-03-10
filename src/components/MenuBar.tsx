import React,{useState,useEffect} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {auth} from "../firebase/index"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);

const MenuBar: React.FC = (props:any) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>{
              //プロフィール画像設定画面へ遷移
              handleClose();
              //ルーティングの定義がまだ
              props.history.push("account");
            }}>
              My account
            </MenuItem>
            <MenuItem onClick={async ()=>{
              //ログアウト
              await auth.signOut();
              handleClose()
            }}>
              Logout
            </MenuItem>
            <MenuItem onClick={()=>{
              //slackへ通知するためのモーダルを表示

              handleClose()
            }}>
              お問い合わせ
            </MenuItem>
          </Menu>
          <Typography variant="h6" color="inherit">
            Math Tweets
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
