import type { ICommand } from '../../types/command';
import { MessageEmbed } from 'discord.js';
import { transpile } from 'typescript';
import { inspect } from 'util';
export const command: ICommand = {
    label: 'eval',
    options: {
        guildOnly: true,
        adminOnly: false,
    },
    execute: (session) => async (msg, args) => {
        try {
            if (msg.author.id !== '659611986413355018')
                throw new Error('Qué hacés down solo Le Val puede usar eso.');
            if (!args.join(' '))
                throw new Error('Código no especificado.');
        }
        // @ts-ignore
        catch (err: unknown) {
            if (err instanceof (String || Error || TypeError || RangeError || EvalError))
                msg.channel.send(
                    ['Error', err],
                    { code: 'js' }
                );
        }
        finally {
            const entry = args?.join(' ');
            const exit = inspect(eval(transpile(entry))).split(session?.token!).join(session?.token?.replace(/.(?=.{25,}$)/g, '#'));
            if (exit)
                return new MessageEmbed()
                    .setAuthor(msg.member?.nickname ?? msg.author.username, msg.author.displayAvatarURL())
                    .setColor('RANDOM')
                    .setTitle('Eval')
                    .addField(`Evaluado en:`, `\`\`\`ts\n${session.ws.ping}ms\`\`\``, true)
                    .addField('Entrada :inbox_tray:', `\`\`\`ts\n${entry}\`\`\``, true)
                    .addField('Salida :outbox_tray:', `\`\`\`ts\n${exit}\`\`\``, true)
                    .addField('Tipo :bar_chart:', `\`\`\`ts\n${typeof exit}\`\`\``, true);
            else
                return 'Escribe algo.';
        }
    }
};