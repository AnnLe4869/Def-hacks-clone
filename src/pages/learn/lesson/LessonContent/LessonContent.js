import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import MenuIcon from "@material-ui/icons/Menu";
import { grey } from "@material-ui/core/colors";
import DOMPurify from "dompurify";

import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    headerBar: {
      backgroundColor: grey[700],
      boxShadow: "none",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    content: {
      height: "calc(100vh - 48px)",
      overflow: "auto",
    },
  })
);

export default function LessonContent() {
  const classes = useStyles();
  const markdown = DOMPurify.sanitize(`<h1 id="sample-markdown">Sample Markdown</h1>
  <p>This is some basic, sample markdown.</p>
  <h2 id="second-heading">Second Heading</h2>
  <ul>
  <li>Unordered lists, and:<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  </ol>
  </li>
  <li>More</li>
  </ul>
  <blockquote>
  <p>Blockquote</p>
  </blockquote>
  <p>And <strong>bold</strong>, <em>italics</em>, and even <em>italics and later <strong>bold</strong></em>. Even <del>strikethrough</del>. <a href="https://markdowntohtml.com">A link</a> to somewhere.</p>
  <p>And code highlighting:</p>
  <pre><code class="lang-js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">'bar'</span>;
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span><span class="hljs-params">(s)</span> </span>{
     <span class="hljs-keyword">return</span> foo + <span class="hljs-string">':'</span> + s;
  }
  </code></pre>
  <p>Or inline code like <code>var foo = &#39;bar&#39;;</code>.</p>
  <p>Or an image of bears</p>
  <p><img src="http://placebear.com/200/200" alt="bears"></p>
  <p>The end ...</p>`);

  return (
    <>
      <div className={classes.root}>
        {/* App bar that show the lesson name */}
        <AppBar position="static" className={classes.headerBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              Intro to HTML
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Lesson content  */}
        {/* For content creators, you can use any tool that can convert normal editor/markdown to HTML and store that HTML to firebase */}
        <Container className={classes.content}>
          <div dangerouslySetInnerHTML={{ __html: markdown }} />
        </Container>
      </div>
    </>
  );
}
