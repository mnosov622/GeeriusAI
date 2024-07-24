'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export default function CrispChat() {
	useEffect(() => {
		Crisp.configure('f091cbfd-c69b-49aa-a638-33c3825cb84d');
	}, []);

	return null;
}
