import React from 'react'
import { Dropdown, Header, Icon, Form, Button } from 'semantic-ui-react'

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

let loginNavStyle = {
    marginTop:20,
    color: "white"
};

let loginDropdownStyle = {
    marginLeft:-20
};

let loginDropdownMenuStyle = {
    left: -190,
    marginTop:15,
    padding:15
};

let loginFormStyle =
{
    maxWidth:200,
    marginTop:10
};

let anchorWidth =
{
    maxWidth:200,
    marginTop:-13
};

const LoginNav = () => (
    <Header as='h4' style={loginNavStyle}>
    <Icon name='user' color='white' />
        <Header.Content>
        <Dropdown style={loginDropdownStyle}>
            <Dropdown.Menu style={loginDropdownMenuStyle}>
                <Form style={loginFormStyle}>
                    <Form.Field>
                        <input placeholder='Email'
                               onClick={e => e.stopPropagation()}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password'
                               onClick={e => e.stopPropagation()}
                               type="password"
                        />
                    </Form.Field>
                    <div style={{textAlign:"center"}}>
                        <a href="#" style={anchorWidth}>Forgot Password?</a>
                        <Button type='submit'>Sign In</Button>
                        <hr/>
                        <p style={{color:"black", maxWidth:200}}>New here?</p>
                        <a href="#" style={anchorWidth}>Join Us!</a>
                    </div>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
        </Header.Content>
    </Header>
)

export default LoginNav