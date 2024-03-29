import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, CardActionArea, Avatar, CardActions, IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AddRepositoryDialog from './AddRepositoryDialog';
import DeleteRepositoryDialog from './DeleteRepositoryDialog';
import { connect } from 'react-redux'
import { setCurrentProjectId } from '../../redux/action'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(25),
  },
  icon: {},
  avatar: {
    width: "100%",
    height: "100%"
  }
}))

function ProjectAvatar(props) {
  const classes = useStyles()
  const history = useHistory()


  const [addRepoDialogOpen, setAddRepoDialogOpen] = useState(false)
  const [deleteRepoDialogOpen, setDeleteRepoDialogOpen] = useState(false)
  const [wantedRepoType, setWantedRepoType] = useState(false)
  const [hasGithubRepo, setHasGithubRepo] = useState(false)
  const [hasSonarRepo, setHasSonarRepo] = useState(false)
  const [hasTrelloRepo, setHasTrelloRepo] = useState(false)

  useEffect(() => {
    if (props.size === 'large') {
      const githubRepo = props.project.repositoryDTOList.find(x => x.type == "github")
      const sonarRepo = props.project.repositoryDTOList.find(x => x.type == "sonar")
      const trelloRepo = props.project.repositoryDTOList.find(x => x.type == "trello")

      setHasGithubRepo(githubRepo != undefined)
      setHasSonarRepo(sonarRepo != undefined)
      setHasTrelloRepo(trelloRepo != undefined)
    }
  }, [props.project])

  const goToCommit = () => {
    localStorage.setItem("projectId", props.project.projectId)
    props.setCurrentProjectId(props.project.projectId)
    history.push("/commits")
  }

  const goToCodeCoverage = () => {
    localStorage.setItem("projectId", props.project.projectId)
    props.setCurrentProjectId(props.project.projectId)
    history.push("/code_coverage")
  }

  const goToDashboard = () => {
    localStorage.setItem("projectId", props.project.projectId)
    props.setCurrentProjectId(props.project.projectId)
    history.push("/dashboard")
  }

  const goToTrello = () => {
    localStorage.setItem("projectId", props.project.projectId)
    props.setCurrentProjectId(props.project.projectId)
    history.push("/trello")
  }

  const showAddRepoDialog = () => {

    setAddRepoDialogOpen(true)
  }

  const showDeleteRepoDialog = () => {

    setDeleteRepoDialogOpen(true)
  }

  return (
    <div>
      <Box className={props.size === 'large' ? classes.large : classes.small}>
        <CardActionArea onClick={goToDashboard}>
          <Avatar alt="first repository" src={props.project.avatarURL} className={classes.avatar} />
          {props.size === 'large' &&
            <p style={{ "textAlign": "center" }}>{props.project.projectName}</p>
          }
        </CardActionArea>
        {props.size === 'large' &&
          <CardActions disableSpacing>
            {hasGithubRepo &&
              <IconButton aria-label="GitHub" onClick={goToCommit}>
                <GitHubIcon />
              </IconButton>
            }
            {hasSonarRepo &&
              <IconButton aria-label="SonarQube" onClick={goToCodeCoverage}>
                <GpsFixedIcon />
              </IconButton>
            }
            {hasTrelloRepo &&
              <IconButton aria-label="Trello" onClick={goToTrello}>
                <AppsIcon />
              </IconButton>
            }
            {(!hasGithubRepo || !hasSonarRepo || !hasTrelloRepo) &&
              <IconButton aria-label="Add Repository" onClick={showAddRepoDialog}>
                <AddIcon />
              </IconButton>
            }
            {(hasGithubRepo || hasSonarRepo || hasTrelloRepo) &&
              <IconButton aria-label="Delete Repository" onClick={showDeleteRepoDialog}>
                <DeleteIcon />
              </IconButton>
            }
          </CardActions>
        }
      </Box>
      <AddRepositoryDialog
        open={addRepoDialogOpen}
        reloadProjects={props.reloadProjects}
        handleClose={() => setAddRepoDialogOpen(false)}
        projectId={props.project.projectId}
        hasGithubRepo={hasGithubRepo}
        hasSonarRepo={hasSonarRepo}
        hasTrelloRepo={hasTrelloRepo}
      />
      <DeleteRepositoryDialog
        open={deleteRepoDialogOpen}
        reloadProjects={props.reloadProjects}
        handleClose={() => setDeleteRepoDialogOpen(false)}
        projectId={props.project.projectId}
        hasGithubRepo={hasGithubRepo}
        hasSonarRepo={hasSonarRepo}
        hasTrelloRepo={hasTrelloRepo}
      />
    </div>//:()
  )
}

export default connect(null, { setCurrentProjectId })(ProjectAvatar);
