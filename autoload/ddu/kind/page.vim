function! ddu#kind#page#open_default(url)
  enew
  setlocal buftype=nofile bufhidden=hide noswapfile
  execute 'r! curl -s ' . a:url . '| html2text -utf8' 
  setlocal readonly
endfunction

