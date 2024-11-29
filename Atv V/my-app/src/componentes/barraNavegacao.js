import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, Pets } from "@mui/icons-material";

const BarraNavegacao = ({ tema, botoes, seletorView }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Atualiza o título da página com base nos botões
    useEffect(() => {
        document.title = `PetLovers - ${botoes[0] || "Home"}`;
    }, [botoes]);

    // Alterna o estado do drawer (menu lateral)
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    // Gera a lista de botões para o drawer
    const gerarListaBotoes = () =>
        botoes.map((valor) => (
            <ListItem
                button
                key={valor}
                onClick={(e) => seletorView(valor, e)}
            >
                <ListItemText primary={valor} />
            </ListItem>
        ));

    return (
        <>
            {/* Barra de navegação fixa no topo */}
            <AppBar position="fixed" sx={{ backgroundColor: tema, width: "100%" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Pets sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, color: "black",position:"center" }}>
                        PetLovers
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Menu lateral (drawer) */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            my: 2,
                            fontWeight: "bold",
                        }}
                    >
                        Menu
                    </Typography>
                    <List>{gerarListaBotoes()}</List>
                </Box>
            </Drawer>

            {/* Ajustar o conteúdo para não ser ocultado pela barra fixa */}
            <Box sx={{ marginTop: "64px" }}>
                {/* O conteúdo da página vai aqui */}
            </Box>
        </>
    );
};

export default BarraNavegacao;
