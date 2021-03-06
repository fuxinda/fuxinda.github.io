const rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;

function fancybox(args) {
  const slug = args.shift(),
    original = args.shift();
  let thumbnail = '',
    tagClass = '';

  const tpl = config => `<p><a data-fancybox="gallery" href="${config.path}" title="${config.title}"><img class="${config.tagClass}" src="${config.path}" alt="${config.title}"></a></p>`

  if (args.length && rUrl.test(args[0])) {
    thumbnail = args.shift();
  }

  if (args.length && !rUrl.test(args[0])) {
    tagClass = args.shift();
  }

  const title = args.join(' ');

  const path = ((thumbnail || original).startsWith('/') || rUrl.test(thumbnail || original)) ? (thumbnail || original) : ('/assets/' + slug + '/' + (thumbnail || original))

  return tpl({ path, title, tagClass });
}

/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox slug /path/to/image [/path/to/thumbnail] [class] [title] %}
 *   {% fb slug /path/to/image [/path/to/thumbnail] [class] [title] %}
 */
hexo.extend.tag.register('fancybox', fancybox, { ends: false });
hexo.extend.tag.register('fb', fancybox, { ends: false });
