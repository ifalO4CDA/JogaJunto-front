import api from './api';

export const GrupoService = {
    getGrupos: async () => {
        const response = await api.get('/group');
        return response.data;
    },

    getGrupoId: async (id) => {
        const response = await api.get(`/group/${id}`);
        return response.data;
    },

    createGrupo: async (grupo) => {
        const response = await api.post('/group', grupo);
        return response.data;
    },

    updateGrupo: async (grupo) => {
        const response = await api.put(`/group/${grupo.id}`, grupo);
        return response.data;
    },

    deleteGrupo: async (id) => {
        const response = await api.delete(`/group/${id}`);
        return response.data;
    },

    
}

// app.use('/api/users', userRoutes); 
// app.use('/api/addresses', addressRoutes);
// app.use('/api/moreInformations', moreInformationsRoutes);
// app.use('/api/reservation', reservationRoutes);
// app.use('/api/group', groupRoutes);
// app.use('/api/evaluation', evaluationRoutes);
// app.use('/api/rooms/', require('./routes/roomRoutes'));